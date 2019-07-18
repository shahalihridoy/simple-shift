import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as Stripe from "stripe";

admin.initializeApp();

const stripe = new Stripe("sk_test_Rw3ZO0e7sqNU8XmbfDnZWxTr00VDgmd7Ri");

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const createStripeCustomer = functions.auth.user().onCreate(user => {
  // register Stripe user
  return stripe.customers
    .create({
      email: user.email
    })
    .then(customer => {
      /// update database with stripe customer id
      const field1 = `/Subscriptons/customers/${customer.id}`;
      const field2 = `/Organisations/${user.uid}/customerId`;
      const updates = {
        [field1]: user.uid,
        [field2]: customer.id
      };

      return admin
        .database()
        .ref()
        .update(updates);
    });
});

// create subscription
// export const createSubscription = functions.database
//   .ref("/Organisations/{userId}/token")
//   .onWrite((event, context) => {
//     const tokenId = event.after.val();
//     const userId = context.params.userId;

//     if (!tokenId) throw new Error("token missing");

//     return admin
//       .database()
//       .ref(`/Organisations/${userId}`)
//       .once("value")
//       .then(snapshot => snapshot.val())
//       .then(user => {
//         return stripe.subscriptions.create({
//           customer: user.customerId,
//           default_source: tokenId
//         });
//       })
//       .then(sub => {
//         const field1 = `/Organisations/${userId}/subscription/status`;
//         const field2 = `/Organisations/${userId}/subscription/plan`;
//         const field3 = `/Organisations/${userId}/subscription/id`;

//         const update = {
//           [field1]: "active",
//           [field2]: sub.plan,
//           [field3]: sub.id
//         };

//         return admin
//           .database()
//           .ref()
//           .update(update);
//       })
//       .catch(err => console.log(err));
//   });

// recurring payments
export const recurringPayment = functions.https.onRequest((req, res) => {
  const hook = req.body.type;
  const data = req.body.data.object;

  console.log(hook);

  if (!data) throw new Error("missing data");

  return admin
    .database()
    .ref(`/Subscriptons/customers/${data.customer}`)
    .once("value")
    .then(snapshot => snapshot.val())
    .then(userId => {
      const field1 = `/Organisations/${userId}/candidates/one/status`;
      const field2 = `/Organisations/${userId}/candidates/two/status`;
      const field3 = `/Organisations/${userId}/subscription/status`;

      // Handle successful payment webhook
      if (
        hook === "customer.subscription.created" ||
        hook === "subscripton_schedule.completed"
      ) {
        const update = {
          [field1]: "active",
          [field2]: "active",
          [field3]: "active"
        };
        return admin
          .database()
          .ref()
          .update(update);
      }

      // Handle failed payment webhook
      else if (
        hook === "subscripton_schedule.cancelled" ||
        hook === "subscripton_schedule.aborted" ||
        hook === "customer.subscription.deleted"
      ) {
        const update = {
          [field1]: "inactive",
          [field2]: "inactive",
          [field3]: "inactive"
        };
        return admin
          .database()
          .ref()
          .update(update);
      }

      throw new Error("Nothing found");
    })
    .then(() => res.status(200).send(`successfully handled ${hook}`))
    .catch(err => res.status(400).send(`error handling ${hook}`));
});

export const createNewSubscription = functions.https.onCall((data, context) => {
  // you have to send tokenId, plan
  const { sourceId, customerId } = data;
  const userId = context.auth!.uid;

  return stripe.customers
    .createSource(customerId, {
      source: sourceId
    })
    .then(() => {
      return stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            plan: data.plan
          }
        ]
      });
    })
    .then(sub => {
      const field1 = `/Organisations/${userId}/subscription/status`;
      const field2 = `/Organisations/${userId}/subscription/plan`;
      const field3 = `/Organisations/${userId}/subscription/id`;
      console.log(sub);

      const update = {
        [field1]: "active",
        [field2]: sub.plan!.id,
        [field3]: sub.id
      };

      return admin
        .database()
        .ref()
        .update(update);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
});

export const cancelSubscription = functions.https.onCall((data, context) => {
  const { subscriptionId } = data;

  if (subscriptionId) return stripe.subscriptions.del(subscriptionId);
  else throw new Error("No subsciption id found");
});

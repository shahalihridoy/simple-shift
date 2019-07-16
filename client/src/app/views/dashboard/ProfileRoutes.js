import MatXLoadable from "../../shared/components/MatXLoadable/MatXLoadable";

const Profile = MatXLoadable({
  loader: () => import("./Profile")
});

const ProfileEditor = MatXLoadable({
  loader: () => import("./ProfileEditor")
});

const Subscription = MatXLoadable({
  loader: () => import("./Subscription")
});

const CandidateManager = MatXLoadable({
  loader: () => import("./CandidateManager")
});

const profileRoutes = [
  {
    path: "/dashboard/profile",
    component: Profile
  },
  {
    path: "/dashboard/edit-profile",
    component: ProfileEditor
  },
  {
    path: "/dashboard/manage-candidate",
    component: CandidateManager
  },
  {
    path: "/dashboard/subscription",
    component: Subscription
  }
];

export default profileRoutes;

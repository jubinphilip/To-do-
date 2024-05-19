import AddTask from "./Addtask.vue";
import ViewTask from "./Viewtask.vue";
import Completed from "./Completed.vue";
import Remaining from "./Remaining.vue";

export default [
    { path: '/add', component: AddTask },
    { path: '/view', component: ViewTask },
    { path: '/completed', component: Completed},
    {path:'/remaining',component:Remaining}
   
];

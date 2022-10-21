/* Layout */
import Layout from "@/layout";

export default [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "Dashboard", icon: "dashboard" },
      },
    ],
  },

  {
    path: "/example",
    component: Layout,
    redirect: "/example/table",
    name: "Example",
    meta: { title: "Example", icon: "el-icon-s-help" },
    children: [
      {
        path: "table",
        name: "Table",
        component: () => import("@/views/table/index"),
        meta: { title: "Table", icon: "table" },
      },
      {
        path: "tree",
        name: "Tree",
        component: () => import("@/views/tree/index"),
        meta: { title: "Tree", icon: "tree" },
      },
    ],
  },

  {
    path: "/form",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Form",
        component: () => import("@/views/form/index"),
        meta: { title: "Form", icon: "form" },
      },
    ],
  },

  {
    path: "/nested",
    component: Layout,
    redirect: "/nested/menu1",
    name: "Nested",
    meta: {
      title: "Nested",
      icon: "nested",
    },
    children: [
      {
        path: "menu1",
        component: () => import("@/views/nested/menu1/index"), // Parent router-view
        name: "Menu1",
        meta: { title: "Menu1" },
        children: [
          {
            path: "menu1-1",
            component: () => import("@/views/nested/menu1/menu1-1"),
            name: "Menu1-1",
            meta: { title: "Menu1-1" },
          },
          {
            path: "menu1-2",
            component: () => import("@/views/nested/menu1/menu1-2"),
            name: "Menu1-2",
            meta: { title: "Menu1-2" },
            children: [
              {
                path: "menu1-2-1",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-1"),
                name: "Menu1-2-1",
                meta: { title: "Menu1-2-1" },
              },
              {
                path: "menu1-2-2",
                component: () =>
                  import("@/views/nested/menu1/menu1-2/menu1-2-2"),
                name: "Menu1-2-2",
                meta: { title: "Menu1-2-2" },
              },
            ],
          },
          {
            path: "menu1-3",
            component: () => import("@/views/nested/menu1/menu1-3"),
            name: "Menu1-3",
            meta: { title: "Menu1-3" },
          },
        ],
      },
      {
        path: "menu2",
        component: () => import("@/views/nested/menu2/index"),
        name: "Menu2",
        meta: { title: "menu2" },
      },
    ],
  },

  {
    path: "external-link",
    component: Layout,
    children: [
      {
        path: "https://panjiachen.github.io/vue-element-admin-site/#/",
        meta: { title: "External Link", icon: "link" },
      },
    ],
  },

  // 正文------------------------------

  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "control",
        name: "Control",
        component: () => import("@/views/control/index"),
        meta: { title: "控制台", icon: "dashboard" },
      },
    ],
  },

  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home/index"),
        meta: { title: "首页标语", icon: "el-icon-s-home" },
      },
    ],
  },

  {
    path: "/blog",
    component: Layout,
    redirect: "/blog",
    name: "Blog",
    meta: { title: "文章管理", icon: "el-icon-notebook-2" },
    children: [
      {
        path: "/blogList",
        name: "BlogList",
        component: () => import("@/views/blogList/index"),
        meta: { title: "文章列表", icon: "el-icon-tickets" },
      },
      {
        path: "/blogType",
        name: "BlogType",
        component: () => import("@/views/blogType/index"),
        meta: { title: "文章类型", icon: "el-icon-c-scale-to-original" },
      },
      {
        path: "/addBlog",
        name: "AddBlog",
        component: () => import("@/views/addBlog/index"),
        meta: { title: "添加文章", icon: "el-icon-edit-outline" },
      },
    ],
  },

  {
    path: "/project",
    component: Layout,
    redirect: "/project",
    name: "Project",
    meta: { title: "项目管理", icon: "el-icon-s-help" },
    children: [
      {
        path: "/projectList",
        name: "ProjectList",
        component: () => import("@/views/blogList/index"),
        meta: { title: "项目列表", icon: "el-icon-s-operation" },
      },
      {
        path: "/projectType",
        name: "ProjectType",
        component: () => import("@/views/blogList/index"),
        meta: { title: "项目分类", icon: "el-icon-folder-opened" },
      },
    ],
  },

  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "comment",
        name: "Comment",
        component: () => import("@/views/comment/index"),
        meta: { title: "评论管理", icon: "el-icon-s-comment" },
      },
    ],
  },

  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "message",
        name: "Message",
        component: () => import("@/views/message/index"),
        meta: { title: "留言板", icon: "el-icon-message-solid" },
      },
    ],
  },

  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "about",
        name: "About",
        component: () => import("@/views/about/index"),
        meta: { title: "关于我", icon: "el-icon-user-solid" },
      },
    ],
  },

  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "setting",
        name: "Setting",
        component: () => import("@/views/setting/index"),
        meta: { title: "设置", icon: "el-icon-s-tools" },
      },
    ],
  },


  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

import Layout from '@/layout'

export default [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '控制台', icon: 'dashboard', auth: true }
      }
    ]
  },

  {
    path: '/banner',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Banner',
        component: () => import('@/views/banner/index'),
        meta: { title: '首页标语', icon: 'el-icon-s-home', auth: true }
      }
    ]
  },

  {
    path: '/blog',
    component: Layout,
    redirect: '/blog',
    name: 'Blog',
    meta: { title: '文章管理', icon: 'el-icon-s-management' },
    children: [
      {
        path: '/blog/blogList',
        name: 'BlogList',
        component: () => import('@/views/blogList/index'),
        meta: { title: '文章列表', icon: 'el-icon-document', auth: true }
      },
      {
        path: '/blog/blogType',
        name: 'BlogType',
        component: () => import('@/views/blogType/index'),
        meta: { title: '文章分类', icon: 'el-icon-menu', auth: true }
      },
      {
        path: '/blog/addBlog',
        name: 'AddBlog',
        component: () => import('@/views/addBlog/index'),
        meta: { title: '添加文章', icon: 'el-icon-circle-plus-outline', auth: true }
      },
      {
        path: '/blog/editBlog/:id',
        name: 'EditBlog',
        hidden: true,
        component: () => import('@/views/editBlog/index'),
        meta: { title: '编辑文章', icon: 'el-icon-circle-plus', auth: true }
      }
    ]
  },

  {
    path: '/projects',
    component: Layout,
    redirect: '/projects',
    name: 'Projects',
    meta: { title: '项目管理', icon: 'el-icon-s-cooperation' },
    children: [
      {
        path: '/projectsList',
        name: 'ProjectsList',
        component: () => import('@/views/projects/index'),
        meta: { title: '项目列表', icon: 'el-icon-folder-opened', auth: true }
      },
      {
        path: '/addProject',
        name: 'AddProject',
        component: () => import('@/views/projects/add/index'),
        meta: { title: '添加项目', icon: 'el-icon-folder-add', auth: true }
      }
    ]
  },
  {
    path: '/comment',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Comment',
        component: () => import('@/views/comment/index'),
        meta: {
          title: '评论管理',
          icon: 'el-icon-s-comment',
          auth: true
        }
      }
    ]
  },
  {
    path: '/message',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Message',
        component: () => import('@/views/message/index'),
        meta: { title: '留言板', icon: 'el-icon-message-solid', auth: true }
      }
    ]
  },

  {
    path: '/about',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'About',
        component: () => import('@/views/about/index'),
        meta: { title: '关于我', icon: 'el-icon-s-custom', auth: true }
      }
    ]
  },

  {
    path: '/setting',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Setting',
        component: () => import('@/views/setting/index'),
        meta: { title: '设置', icon: 'el-icon-s-tools', auth: true }
      }
    ]
  },

  {
    path: '/personalSetting',
    component: Layout,
    hidden: true,
    meta: { children: ['/personalSetting'] },
    children: [
      {
        path: '/personalSetting',
        name: 'PersonalSetting',
        component: () => import('@/views/personalSetting/index'),
        meta: { title: '个人中心', icon: 'el-icon-document-copy', auth: true }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

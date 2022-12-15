 <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
     <link rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
      integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu"
      crossorigin="anonymous">
    <!-- 引入 jQuery -->
      <script
      src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.1/jquery.slim.min.js"></script>
      <!-- 最新版本的 Bootstrap 核心 JavaScript 文件 -->
      <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"
      integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd"
      crossorigin="anonymous">
      </script>
React-router v6 路由总结
组件
- BrowserRouter：整个前端路由以 history 开启，包裹根组件
- HashRouter：整个前端路由以 hash 模式开启，包裹根组件
- Routes：类似于 v5 版本的switch，主要是提供一个上下文环境
- Route：在 Route 组件中书写你对应的路由，以及路由所对应的组件
  - path：匹配的路由
  - element：匹配上该路由时，要渲染的组件
- Navigate：导航组件，类似于 useNavigate 的返回值函数，只不过这是一个组件
- NaviLink：类似于 Link，最终和 Link 一样，会被渲染为 a 标签，注意它和 Link 的区别，实际上就是当前链接，会有一个名为 active 的激活样式，所以一般用于做顶部或者左侧边导航栏的跳转
Hooks
- useLocation：获取到 location 对象，获取到 location 对象后，我们可以获取 state 属性，这往往是其他路由跳转过来的时候，会在 state 里面传递额外的数据
- useNavigate：调用之后会返回一个函数，通过该函数可以做跳转。
- useParams：获取动态参数

补充内容
useRoutes
使用示例如下

export default function Router(props) {
  return useRoutes([
    { path: "/home", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/add", element: <AddOrEdit /> },
    { path: "/edit/:id", element: <AddOrEdit /> },
    { path: "/detail/:id", element: <Detail /> },
    { path: "/", element: <Navigate replace to="home" /> },
  ]);
}
嵌套路由
直接在 useRoutes 进行 children 属性的配置即可，类似于 vue-router，children 对应的是一个数组，数组里面是一个一个路由对象
 {
      path: "/about",
      element: <About />,
      children: [
        { path: "email", element: <Email /> },
        { path: "tel", element: <Tel /> },
        { path: "", element: <Navigate replace to="email" /> },
      ],
    },
之后使用 Outlet 组件，该组件表示匹配上的子路由组件渲染的位置。

import TodoList from '@/pages/todo-list'
import About from '../../src/pages/about'
import Haha from '../../src/pages/haha'
const routes = [
  {
    key: 'about',
    path: '/about',
    component: About,
  },
  {
    key: 'haha',
    path: '/about/haha',
    component: Haha,
  },
  {
    key: 'totolist',
    path: '/about/haha/todolist',
    component: TodoList,
  },
]
export default routes
// children: [
//   {
//     key: 'haha',
//     path: 'haha',
//     component: Haha,
//     children: [
//       {
//         key: 'totolist',
//         path: 'todolist',
//         component: TodoList,
//       },
//     ],
//   },
// ],

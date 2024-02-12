import { NotificationProvider } from './contexts/NotificationContext'
import Notification from './components/Notification'
import Blogs from './components/Blogs'

const App = () => {


  return (
    <div style={{padding: "15px"}}>
      <h2>blogs</h2>
      <NotificationProvider>
        <Notification />
        <Blogs />
      </NotificationProvider>
    </div>
  )
}

export default App
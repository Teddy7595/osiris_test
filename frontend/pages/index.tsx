import Layout from '../components/Layout.component';
import Store from '../components/store.component';

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Store/>
      </div>
    </Layout>
  )
}

import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css';
import { RouteGuard } from "@/components/layout/route_guard";
export default function App({ Component, pageProps }) {
  return (
    <>
    <RouteGuard>
  <Component {...pageProps} />
  </RouteGuard>
  </>
  );
}

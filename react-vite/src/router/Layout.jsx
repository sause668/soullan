import { useEffect, useState } from "react";
import { Outlet} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Footer from "../components/Footer/Footer";
import Navigation from "../components/Navigation/Navigation";

export default function Layout() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate())
      .then(() => setIsLoaded(true))
      .catch(error => console.log(error));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        {isLoaded && (
          <div id="mainPageCon">
            <div id="subPageCon">
              {user && <Navigation/>}
              <Outlet />
            </div>
            {user && <Footer/>}
          </div>
        )}
        <Modal />
      </ModalProvider>
    </>
  );
}

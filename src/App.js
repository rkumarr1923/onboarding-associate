import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { userDetails } from "./store";
import DateFilter from "./components/associate/DateFilter";
import AddNewAssociate from "./components/associate/AddNewAssociate";
import OnBoardingCheckList from "./components/associate-useful/On-BoardingCheckList/OnBoardingCheckList";
import UploadDocument from "./components/document/UploadDocument";
import TrainingLinks from "./components/associate-useful/TrainingLinks";
import AllAssociate from "./components/associate/AllAssociates";
import Welcome from "./components/home/Welcome";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Onboarding from "./views/Onboarding";
import PageNotFound from "./views/PageNotFound";
import "./styles/app.css";
import CommentComponent from "./components/Comment/CommentComponent";
import LoginComponent from "./components/Auth/LoginComponent";
import NewUserComponent from "./components/Auth/NewUserComponent";

function App() {
  const user = useSelector(userDetails);
  return (
    <div className="app-container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Onboarding />}>
            <Route path="/" element={<Welcome />} />
            {user && (
              <>
                <Route path="newAssociate" element={<AddNewAssociate />} />
                <Route path="dateFilter" element={<DateFilter />} />
                <Route path="allAssociates" element={<AllAssociate />} />
                <Route
                  path="onBoardingCheckList"
                  element={<OnBoardingCheckList />}
                />
                <Route path="uploadDocuments" element={<UploadDocument />} />
                <Route path="trainingLinks" element={<TrainingLinks />} />
                <Route path="comment" element={<CommentComponent />} />
                <Route path="auth/register" element={<NewUserComponent />} />
              </>
            )}
            <Route path="auth/login" element={<LoginComponent />} />
          </Route>
          {/* <Route path="sample" element={<Sample />} /> */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

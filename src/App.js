import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { userDetails } from "./store";
import OnBoardingCheckList from "./components/associate-useful/On-BoardingCheckList/OnBoardingCheckList";
import UploadDocument from "./components/document/UploadDocument";
import TrainingLinks from "./components/associate-useful/TrainingLinks/TrainingMainComponent";
import Recording from "./components/associate-useful/Recording/RecordingMainComponent";
import Welcome from "./components/home/Welcome";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Onboarding from "./views/Onboarding";
import PageNotFound from "./views/PageNotFound";
import CommentComponent from "./components/comment/CommentComponent";
import LoginComponent from "./components/auth/LoginComponent";
import NewUserComponent from "./components/auth/NewUserComponent";
import Associates from './components/associate/Associates';
import "./styles/app.css";
import SampleDocuments from './components/document/SampleDocuments';

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
                <Route path="allAssociates" element={<Associates />}/>
                <Route path="onBoardingCheckList" element={<OnBoardingCheckList />}/>
                <Route path="uploadDocuments" element={<UploadDocument />} />
                <Route path="sampleDocuments" element={<SampleDocuments />} />
                <Route path="trainingLinks" element={<TrainingLinks />} />
                <Route path="recording" element={<Recording />} />
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

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
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

function App() {
  return (
    <div className="app-container">
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Onboarding />}>
              <Route path="/" element={<Welcome />} />
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
            </Route>
            {/* <Route path="sample" element={<Sample />} /> */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

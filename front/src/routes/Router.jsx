import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import RecipePage from "../pages/recipes/RecipePage";
import Page404 from "../pages/Page404";
import AllUsers from "../pages/admin system/AllUsers";
import Participant from "../pages/admin system/Participant";
import AdminGuard from "../guard/AdminGuard";
import AuthGuard1 from "../guard/AuthGuard1";
import MyLikeRecipe from "../pages/recipes/MyLikeRecipe";
import AllWorkshopPage from "../pages/workshop/AllWorkshopPage";
import { AllRecipePage } from "../pages/recipes/AllRecipePage";
import CreateRecipeForm from "../pages/admin system/Create recipe/CreateRecipeForm";
import CreateWorkshopForm from "../pages/admin system/Create workshop/CreateWorkshopForm";
import RecipeByCategoryPage from "../pages/recipes/RecipeByCategoryPage";
import EditWorkshopForm from "../pages/admin system/Edit workshop/EditWorkshopForm";
import EditRecipeForm from "../pages/admin system/Edit recipe/EditRecipeForm";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/allrecipe" element={<AllRecipePage />} />
      <Route path="/recipepage" element={<RecipePage />} />
      <Route path="/allworkshop" element={<AllWorkshopPage />} />
      <Route path="/recipebycategory" element={<RecipeByCategoryPage />} />

      <Route
        path="/createrecipe"
        element={
          <AdminGuard>
            <CreateRecipeForm />
          </AdminGuard>
        }
      />
      <Route
        path="/createworkshop"
        element={
          <AdminGuard>
            <CreateWorkshopForm />
          </AdminGuard>
        }
      />
      <Route
        path="/editworkshop"
        element={
          <AdminGuard>
            <EditWorkshopForm />
          </AdminGuard>
        }
      />
      <Route
        path="/editrecipe"
        element={
          <AdminGuard>
            <EditRecipeForm />
          </AdminGuard>
        }
      />
      <Route
        path="/allusers"
        element={
          <AdminGuard>
            <AllUsers />
          </AdminGuard>
        }
      />
      <Route
        path="/participant"
        element={
          <AdminGuard>
            <Participant />
          </AdminGuard>
        }
      />

      <Route
        path="/likesrecipe"
        element={
          <AuthGuard1>
            <MyLikeRecipe />
          </AuthGuard1>
        }
      />

      <Route path="*" component={Page404} />
    </Routes>
  );
};

export default AppRouter;

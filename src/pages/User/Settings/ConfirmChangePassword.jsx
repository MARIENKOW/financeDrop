import { useParams } from "react-router";
import { useState, useEffect, useContext } from "react";
import Loading from "../../../component/general/Loading/Loading";
import userService from "../../../services/UserService";
import ErrorElement from "../../../component/general/ErrorElement";
import PasswordWasChangedSuccess from "../../../component/User/Success/PasswordWasChangedSuccess";
import { useQuery } from "@tanstack/react-query";
import UserService from "../../../services/UserService";
import { Context } from "../../../User";
import { enqueueSnackbar } from "notistack";

const ConfirmChangePassword = () => {
   const { link } = useParams();

   const {setUnauthorized} = useContext(Context)

   const { isLoading, error,isSuccess } = useQuery({
      queryKey: ["confirmChangePassword"],
      queryFn: () => UserService.confirmChangePasswordSettingsLink(link),
      refetchOnWindowFocus:false,
   });

   if (isLoading) return <Loading />;

   if (error) return <ErrorElement message={error?.response?.data} />;



   if (isSuccess) {
      enqueueSnackbar('The password has been changed',{variant:'success'})
      return setUnauthorized()
   }
};

export default ConfirmChangePassword;

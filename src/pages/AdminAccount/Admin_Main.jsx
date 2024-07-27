import { useQuery } from "@tanstack/react-query";
import UserService from "../../services/UserService";
import Loading from "../../component/general/Loading/Loading";
import ErrorElement from "../../component/general/ErrorElement";
import { ContainerComponent } from "../../component/general/wrappers/ContainerComponent";
import { Title } from "../../component/general/Title";
import Grid from "@mui/material/Grid";
import { UserCard } from "../../component/Admin/user/UserCard";
import { UserCard_skeleton } from "../../component/Admin/skeletons/UserCard_skeleton";
import { Empty } from "../../component/general/Empty";

export const Admin_Main = () => {
   const { isLoading, data, error } = useQuery({
      queryKey: ["users"],
      queryFn: UserService.getAll,
      select: ({ data }) => data,
   });
   if (error) return <ErrorElement />;

   console.log(data);
   return (
      <ContainerComponent>
         <Title label={"Users"} />
         {isLoading ? (
            <Grid container spacing={2} columns={6}>
               {Array(4)
                  .fill("5")
                  .map((el, id) => (
                     <Grid item xs={6} key={id}>
                        <UserCard_skeleton />
                     </Grid>
                  ))}
            </Grid>
         ) : data?.length !== 0 ? (
            <Grid container spacing={2} columns={6}>
               {data.map((el) => (
                  <Grid key={el?.uuid} item xs={6}>
                     <UserCard user={el} />
                  </Grid>
               ))}
            </Grid>
         ) : (
            <Empty />
         )}
      </ContainerComponent>
   );
};

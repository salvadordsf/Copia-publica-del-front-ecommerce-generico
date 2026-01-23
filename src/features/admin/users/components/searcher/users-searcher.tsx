import UserSearchFilters from "./users-filters";
import UserList from "./users-list";

export default function UserSearcher() {
  return(
    <section>
      <UserSearchFilters />
      <UserList />
    </section>
  )
}

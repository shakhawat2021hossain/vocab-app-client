import useAuth from './useAuth';
const useRole = () => {
    const { user, loading } = useAuth()
    // console.log(user);
    const role = user?.role

    return [role];
};

export default useRole;
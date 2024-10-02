Update password
    link => admin/update-password
    route => admin/update-password => AdminUpdatePassword
    make a form for oldPassword, newPassword
    make a update button
        hit api
        logout (remove token from localStorage)
        redirect to login page


forgot password
    forgot password (button)
    onclick => /admin/forgot-password (navigate)
    component => /admin/forgot-password     AdminForgotPassword
    make form - email 

reset password
    click - frontend link
    define route - /reset-password AdminResetPassword
    pass token
    form - password
    redirect to login

while getting token
    add token to useContext from localStorage

    if other component needs token
    get token from useContext rather than localStorage(for page refresh purpose)

while changing token
    change to localStorage
    change to useContext


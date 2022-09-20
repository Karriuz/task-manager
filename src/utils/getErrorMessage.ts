export const getErrorMessage = (errorCode: string) => {
  switch (errorCode) {
    case 'auth/weak-password':
      return 'Sorry!, Your password is too weak. '
    case 'auth/email-already-in-use':
      return 'Sorry! Email is already in use. '
    case 'auth/wrong-password':
      return 'Incorrect password for this email'
    case 'auth/user-not-found':
      return 'Sorry! User with this email not found'
    default:
      return null
  }
}

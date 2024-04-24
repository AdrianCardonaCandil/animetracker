export default interface User {
  readonly id: string
  username: string
  email: string
  password: string
  description: string
  country: string
  profilePicture: string
  watching: []
  dropped: []
  completed: []
  planToWatch: []
  favorites: []
  userScores: { [key: string]: number }
  contentProgress: { [key: string]: number }
}

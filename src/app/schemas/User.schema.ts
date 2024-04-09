export default interface User {
  readonly id: string
  username: string
  email: string
  password: string
  reviews: string[]
  description: string
  country: string
  profilePicture: string
  watching: []
  dropped: []
  completed: []
  planToWatch: []
  favorites: []
  userScores: Map<string,string>
}

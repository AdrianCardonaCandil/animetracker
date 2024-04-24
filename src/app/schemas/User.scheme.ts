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
export function parse(data: any): User | null {
  try {
    return {
      id: data.id || "",
      username: data.username || "",
      email: data.email || "",
      password: data.password || "",
      description: data.description || "",
      country: data.country || "",
      profilePicture: data.profilePicture || "",
      watching: data.watching || [],
      dropped: data.dropped || [],
      completed: data.completed || [],
      planToWatch: data.planToWatch || [],
      favorites: data.favorites || [],
      userScores: data.userScores || {},
      contentProgress: data.contentProgress || {}
    };
  } catch (error) {
    console.log('Error parsing user', error);
    return null;
  }
}

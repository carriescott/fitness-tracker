export interface Run {
  time: number;
  distance: number;
  calories: number;
  route: Route[];
  date?: Date;
  state?: 'completed' | 'cancelled' | null;
}

interface Route {
    lat: number;
    lng: number;
}

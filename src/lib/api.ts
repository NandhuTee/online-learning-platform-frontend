const BASE_URL = "http://localhost:5000/api";

export async function getCourses() {
  const res = await fetch(`${BASE_URL}/courses`);
  return res.json();
}

export async function getCourseDetails(courseId: string) {
  const res = await fetch(`${BASE_URL}/courses/${courseId}`);
  return res.json();
}

export async function getCourseVideos(courseId: string) {
  const res = await fetch(`${BASE_URL}/videos/${courseId}`);
  return res.json();
}

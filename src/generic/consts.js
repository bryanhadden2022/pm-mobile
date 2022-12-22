export const fallbackAvatar =
    'https://renderer-v2.vercel.app/_next/image?url=https%3A%2F%2Fapi.typedream.com%2Fv0%2Fdocument%2Fpublic%2Fffd19e6e-3cf5-49a2-985c-8086255e3a33%2F2H5X0HKQFSZYSTHAqGYlzKycibD_Project_Mush_Logo-01.png%3Fbucket%3Ddocument&w=256&q=100';

export const token = 'VN3LDjAnOoZr9LuL7UEk4H3ATgYgpC_dD7DieSZdb3U';
export const addCommentQuery = `https://projectmushroom.social/api/v1/statuses`
export const removeCommentQuery = `https://projectmushroom.social/api/v1/statuses/`
export const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
}
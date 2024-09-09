export default function timeAgo(timestamp) {
    const now:any = new Date();
    const updatedAt:any = new Date(timestamp);
    const diffInSeconds = Math.floor((now - updatedAt) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);

    if(!diffInMinutes)
      return 'just now'
    else if (diffInMinutes < 1) {
      return 'just now';
    } else if (diffInMinutes === 1) {
      return '1 minute ago';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) { // less than 24 hours
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInMinutes / 1440);
      return `${diffInDays} days ago`;
    }
  }
  
  
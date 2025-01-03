export function convertUnixTimestamp(timestamp) {
    // Convert timestamp to milliseconds
    const milliseconds = timestamp * 1000;
    
    // Create a new Date object
    const dateObject = new Date(milliseconds);
    
    // Format the date as a string (adjust format as needed)
    const formattedDate = dateObject.toLocaleString(); // Adjust locale as needed
    
    return formattedDate;
}
export const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
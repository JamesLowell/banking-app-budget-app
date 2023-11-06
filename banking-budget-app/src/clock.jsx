export default function Clock() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const twelveHourFormat = ((hours + 11) % 12 + 1) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
  
    return (
      <div>
        <span align="center">{twelveHourFormat}</span>
      </div>
    );
  }


 const time_calculation = {
    cancel_at: function ( startDate, pausedAt, planInterval, planDuration) {
        const startDateUnix = Math.floor(new Date(startDate).getTime() / 1000);
        const pausedAtUnix = Math.floor(new Date(pausedAt).getTime() / 1000);
        const resumeDateUnix = Math.floor(new Date().getTime() / 1000);
      
        const elapsedTimeInSeconds = pausedAtUnix - startDateUnix;
    
        let remainingTimeInSeconds;
        switch (planInterval) {
          case 'day':
            remainingTimeInSeconds = planDuration * 24 * 60 * 60 - elapsedTimeInSeconds;
            break;
          case 'week':
            remainingTimeInSeconds = planDuration * 7 * 24 * 60 * 60 - elapsedTimeInSeconds;
            break;
          case 'month':
            remainingTimeInSeconds = planDuration * 30 * 24 * 60 * 60 - elapsedTimeInSeconds; // Approximate month as 30 days
            break;
          case 'year':
            remainingTimeInSeconds = planDuration * 365 * 24 * 60 * 60 - elapsedTimeInSeconds; // Approximate year as 365 days
            break;
          default:
            throw new Error('Invalid plan interval');
        }
      
        const newCancelAtUnix = resumeDateUnix + remainingTimeInSeconds;
        return newCancelAtUnix;
      }

 }

  module.exports = time_calculation
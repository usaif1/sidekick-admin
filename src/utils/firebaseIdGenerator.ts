export function generateMockFirebaseId(length: number = 28): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uid = '';
    for (let i = 0; i < length; i++) {
      uid += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return uid;
  }
  
import React, { useEffect } from 'react';
import { User } from 'SCModels';

interface Props {
  startStream: (user: User) => void;
}
function Main({ startStream }: Props) {
  useEffect(() => {
    startStream({ id: 'test@sc.org', name: 'Elon Musk' });
  }, []);

  return (
    <main>
    </main>
  );
}

export default Main;

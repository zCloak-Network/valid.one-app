'use client';

import { default as useStore, observer } from '@/store';

export default observer(function HomePage() {
  const { User } = useStore();
  return (
    <div className='text-center'>
      <div>{User.name}</div>
      <button className='btn' onClick={() => User.changeName()}>
        rename
      </button>
    </div>
  );
});

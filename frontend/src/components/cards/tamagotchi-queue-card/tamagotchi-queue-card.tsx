import { TamagotchiAvatar } from '../../tamagotchi/tamagotchi-avatar';
import clsx from 'clsx';
import { Icon } from '../../ui/icon';
import { BattlePlayerType } from '../../../app/types/battles';
import { useEffect, useState } from 'react';
import { getTamagotchiAgeDiff } from '../../../app/utils/get-tamagotchi-age';

type TamagotchiQueueCardProps = {
  className?: string;
  tamagotchi: BattlePlayerType;
};

export const TamagotchiQueueCard = ({ className, tamagotchi }: TamagotchiQueueCardProps) => {
  const [dead, setDead] = useState(false);

  useEffect(() => {
    if (!tamagotchi.health) {
      setDead(!tamagotchi.health);
    }
  }, [tamagotchi]);

  return (
    <div
      className={clsx(
        'relative grid gap-2 justify-center w-fit py-4 px-5 bg-[#29292B] rounded-2xl',
        className,
        dead && 'opacity-30',
      )}>
      {dead && <Icon name="message-rip" width={25} height={25} className="absolute top-2 right-2" />}
      <div
        className={clsx(
          'relative w-15 xl:w-24 aspect-square m-auto rounded-full overflow-hidden ring-4 ring-opacity-10',
          dead ? 'bg-error ring-error' : 'bg-white ring-white',
        )}>
        <TamagotchiAvatar
          inBattle
          className="w-30 xl:w-48 aspect-square -left-1/2"
          age={getTamagotchiAgeDiff(tamagotchi.dateOfBirth)}
          hasItem={[]}
          color={tamagotchi.color}
          isDead={dead}
        />
      </div>
      <h3 className="flex justify-center text-center tracking-[0.03em] text-sm font-medium">
        <span className="block truncate max-w-[10ch]">{tamagotchi.name ? tamagotchi.name : 'Geary'}</span>
      </h3>
      <div className="w-full max-w-[300px] space-y-3">
        <div className={clsx('relative w-30 px-4 rounded-xl overflow-hidden', dead ? 'bg-error' : 'bg-white/10')}>
          {!dead && (
            <div className="absolute inset-0 rounded-xl bg-primary" style={{ width: `${tamagotchi.health / 25}%` }} />
          )}
          <div className="relative flex gap-1 items-center justify-center">
            <Icon name="health" className="w-3.5 h-3.5" />
            <span className="font-kanit text-xs font-medium leading-5">{Math.round(tamagotchi.health / 250)} / 10</span>
          </div>
        </div>
      </div>
    </div>
  );
};

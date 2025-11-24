import React, { useMemo } from 'react';
import { Logo } from '../Logo';
import { TrendingUp } from '../icons';

interface InstagramShareTemplateProps {
  category: string;
  categoryColor?: string;
  plNumber: string;
  voteType: 'favor' | 'contra' | 'indeciso';
  title: string;
  description: string;
  communityApproval: number;
  entity: string;
  date: string;
}

export function InstagramShareTemplate({
  category,
  categoryColor = '#4BBF95',
  plNumber,
  voteType,
  title,
  description,
  communityApproval,
  entity,
  date,
}: InstagramShareTemplateProps) {
  const voteConfig = {
    favor: {
      text: 'A FAVOR',
      color: '#4BBF95',
      icon: '👍',
    },
    contra: {
      text: 'CONTRA',
      color: '#E5484D',
      icon: '👎',
    },
    indeciso: {
      text: 'EM ANÁLISE',
      color: '#FFC947',
      icon: '🤔',
    },
  };

  const currentVote = voteConfig[voteType];

  return (
    <div className="relative w-[1080px] h-[1920px] bg-[#FAFAFA] overflow-hidden">
      {/* Background blur effect - cidade */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(180deg, #FAFAFA 0%, #E8E8E8 100%)',
        }}
      />
      
      {/* Building silhouette on the right */}
      <div 
        className="absolute right-0 top-0 w-1/2 h-full opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='540' height='1920' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='building' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Crect x='0' y='0' width='40' height='100' fill='%23003F7D' opacity='0.3'/%3E%3Crect x='5' y='5' width='8' height='8' fill='white' opacity='0.5'/%3E%3Crect x='15' y='5' width='8' height='8' fill='white' opacity='0.5'/%3E%3Crect x='27' y='5' width='8' height='8' fill='white' opacity='0.5'/%3E%3Crect x='5' y='18' width='8' height='8' fill='white' opacity='0.5'/%3E%3Crect x='15' y='18' width='8' height='8' fill='white' opacity='0.5'/%3E%3Crect x='27' y='18' width='8' height='8' fill='white' opacity='0.5'/%3E%3Crect x='5' y='31' width='8' height='8' fill='white' opacity='0.5'/%3E%3Crect x='15' y='31' width='8' height='8' fill='white' opacity='0.5'/%3E%3Crect x='27' y='31' width='8' height='8' fill='white' opacity='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='540' height='1920' fill='url(%23building)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col p-16">
        {/* Category tag */}
        <div className="mb-12">
          <div
            className="inline-block px-10 py-5 rounded-full"
            style={{
              backgroundColor: categoryColor,
              color: 'white',
            }}
          >
            <span
              style={{
                fontSize: '2.25rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
              }}
            >
              {category}
            </span>
          </div>
        </div>

        {/* PL Number */}
        <div className="mb-8">
          <h2
            style={{
              fontSize: '4.5rem',
              fontWeight: 800,
              color: '#003F7D',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            {plNumber}
          </h2>
        </div>

        {/* Vote declaration */}
        <div className="mb-12">
          <div
            style={{
              fontSize: '5.5rem',
              fontWeight: 900,
              color: '#003F7D',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            MEU VOTO:
          </div>
          <div
            className="flex items-center gap-6 mt-4"
            style={{
              fontSize: '5.5rem',
              fontWeight: 900,
              color: currentVote.color,
              letterSpacing: '-0.01em',
              lineHeight: 1,
            }}
          >
            {currentVote.text}
            <span style={{ fontSize: '6rem' }}>{currentVote.icon}</span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1
            style={{
              fontSize: '3.75rem',
              fontWeight: 700,
              color: '#2A2A2A',
              lineHeight: 1.2,
              marginBottom: '1.5rem',
            }}
          >
            {title}
          </h1>
        </div>

        {/* Description */}
        <div className="mb-16">
          <p
            style={{
              fontSize: '2.25rem',
              fontWeight: 400,
              color: '#4A4A4A',
              lineHeight: 1.5,
            }}
          >
            {description}
          </p>
        </div>

        {/* Community approval */}
        <div
          className="mb-16 p-8 rounded-3xl"
          style={{
            backgroundColor: 'rgba(75, 191, 149, 0.1)',
            border: '2px solid rgba(75, 191, 149, 0.3)',
          }}
        >
          <div className="flex items-center gap-4 mb-3">
            <TrendingUp
              className="w-12 h-12"
              style={{ color: currentVote.color, strokeWidth: 3 }}
            />
            <span
              style={{
                fontSize: '2rem',
                fontWeight: 600,
                color: '#003F7D',
              }}
            >
              Aprovação da comunidade
            </span>
          </div>
          <p
            style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#2A2A2A',
            }}
          >
            {communityApproval}% dos cidadãos também são favoráveis
          </p>
        </div>

        {/* Spacer to push bottom content down */}
        <div className="flex-1" />

        {/* Entity and date + QR Code */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <p
              style={{
                fontSize: '2rem',
                fontWeight: 500,
                color: '#6B7280',
              }}
            >
              {entity} · {date}
            </p>
          </div>

          {/* QR Code placeholder */}
          <div className="flex flex-col items-center gap-4">
            <div
              className="rounded-2xl flex items-center justify-center"
              style={{
                width: '200px',
                height: '200px',
                backgroundColor: 'white',
                border: '3px solid #003F7D',
              }}
            >
              <div className="text-center">
                <div
                  className="grid grid-cols-8 gap-1 mb-2"
                  style={{ width: '160px', height: '160px' }}
                >
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-sm"
                      style={{
                        backgroundColor: Math.random() > 0.5 ? '#003F7D' : 'white',
                        width: '18px',
                        height: '18px',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p
              className="text-center"
              style={{
                fontSize: '1.5rem',
                fontWeight: 500,
                color: '#6B7280',
                maxWidth: '200px',
              }}
            >
              Acesse o Opina+<br />para participar
            </p>
          </div>
        </div>

        {/* Logo and slogan */}
        <div className="flex items-center gap-8 pt-8 border-t-2 border-gray-200">
          <Logo variant="icon" size={80} />
          <div>
            <h3
              style={{
                fontSize: '4rem',
                fontWeight: 800,
                color: '#003F7D',
                marginBottom: '0.5rem',
                letterSpacing: '-0.01em',
              }}
            >
              OPINA+
            </h3>
            <p
              style={{
                fontSize: '2rem',
                fontWeight: 500,
                color: '#4A4A4A',
              }}
            >
              Participe das decisões<br />políticas importantes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
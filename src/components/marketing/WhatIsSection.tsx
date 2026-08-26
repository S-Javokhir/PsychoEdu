import React from 'react';
import { Radio, Video, FileText, Camera, Play, Layers } from 'lucide-react';
import { Card } from '../common/Card';

export const WhatIsSection: React.FC = () => {
  return (
    <section id="platforma" className="py-16 lg:py-24 bg-surface border-y border-border-ui/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-teal-800 bg-sage-light px-3 py-1 rounded-full uppercase tracking-wider border border-sage inline-block mb-3">
            Platforma haqida
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-main tracking-tight">
            PsychoEdu nima?
          </h2>
          <p className="text-sm sm:text-base text-text-muted mt-3 leading-relaxed">
            Real amaliyot, strukturalangan bilim va zamonaviy raqamli ta’lim — yagona platformada.
          </p>
        </div>

        {/* 3 Core Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Jonli monitoring */}
          <Card
            padded="lg"
            className="flex flex-col justify-between border-border-ui hover:border-teal-300 hover:shadow-card transition-all duration-200 group"
          >
            <div>
              {/* Minimal Graphic Box */}
              <div className="h-40 bg-page rounded-xl border border-border-ui flex items-center justify-center relative overflow-hidden mb-6 group-hover:bg-teal-50/50 transition-colors">
                <div className="w-16 h-12 bg-surface rounded-lg shadow-subtle border border-border-ui flex items-center justify-center relative">
                  <Camera className="w-6 h-6 text-deep-teal" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-surface" />
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] text-text-muted font-mono bg-surface/90 px-2.5 py-1 rounded border border-border-ui">
                  <span>203-xona (Efir)</span>
                  <span className="text-emerald-700 font-bold">● LIVE</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-deep-teal flex items-center justify-center border border-teal-100">
                  <Radio className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-text-main group-hover:text-deep-teal transition-colors">
                  Jonli monitoring
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Ruxsat etilgan psixologik mashg‘ulotlarni real vaqt rejimida kuzating va mutaxassisning amaliy ish jarayonini o‘rganing.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border-ui text-xs font-semibold text-deep-teal">
              Watch-Only o‘quv rejimi →
            </div>
          </Card>

          {/* Card 2: Video kutubxonasi */}
          <Card
            padded="lg"
            className="flex flex-col justify-between border-border-ui hover:border-teal-300 hover:shadow-card transition-all duration-200 group"
          >
            <div>
              {/* Minimal Graphic Box */}
              <div className="h-40 bg-page rounded-xl border border-border-ui flex items-center justify-center relative overflow-hidden mb-6 group-hover:bg-teal-50/50 transition-colors">
                <div className="w-20 h-14 bg-surface rounded-lg shadow-subtle border border-border-ui flex items-center justify-center relative">
                  <Play className="w-6 h-6 text-deep-teal fill-teal-100" />
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] text-text-muted font-mono bg-surface/90 px-2.5 py-1 rounded border border-border-ui">
                  <span>KBT Terapiyasi</span>
                  <span className="text-text-main font-bold">42:15</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-deep-teal flex items-center justify-center border border-teal-100">
                  <Video className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-text-main group-hover:text-deep-teal transition-colors">
                  Video kutubxonasi
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Yozib olingan amaliy seanslar va demonstratsion videolar orqali psixologik metodikalarning bosqichma-bosqich qo‘llanilishini ko‘ring.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border-ui text-xs font-semibold text-deep-teal">
              Metod va vaqt belgilari →
            </div>
          </Card>

          {/* Card 3: O‘quv materiallari */}
          <Card
            padded="lg"
            className="flex flex-col justify-between border-border-ui hover:border-teal-300 hover:shadow-card transition-all duration-200 group"
          >
            <div>
              {/* Minimal Graphic Box */}
              <div className="h-40 bg-page rounded-xl border border-border-ui flex items-center justify-center relative overflow-hidden mb-6 group-hover:bg-teal-50/50 transition-colors">
                <div className="w-16 h-14 bg-surface rounded-lg shadow-subtle border border-border-ui flex flex-col items-center justify-center gap-1">
                  <FileText className="w-6 h-6 text-deep-teal" />
                  <span className="text-[9px] font-mono font-bold bg-sage-light text-deep-teal px-1.5 rounded">PDF</span>
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] text-text-muted font-mono bg-surface/90 px-2.5 py-1 rounded border border-border-ui">
                  <span>Diagnostika shabloni</span>
                  <span className="text-text-main font-bold">2.4 MB</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-deep-teal flex items-center justify-center border border-teal-100">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-text-main group-hover:text-deep-teal transition-colors">
                  O‘quv materiallari
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Metodik qo‘llanmalar, diagnostika protokollari, taqdimotlar va amaliy keyslarga to‘g‘ridan-to‘g‘ri bir joydan kiring.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border-ui text-xs font-semibold text-deep-teal">
              Materiallar & Keyslar →
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

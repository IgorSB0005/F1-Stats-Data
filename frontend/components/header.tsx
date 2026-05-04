"use client";

import Image from "next/image";
import Link from "next/link";
import SignInBtn from "./signBtn";
import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
} from "@heroicons/react/20/solid";

const products = [
  {
    name: "Mercedes",
    description: "George Russell / Kimi Antonelli",
    href: "/statsBattle?mode=team&left=mercedes",
    icon: "/teams/mercedesLogo.svg",
  },
  {
    name: "Ferrari",
    description: "Charles Leclerc / Lewis Hamilton",
    href: "/statsBattle?mode=team&left=ferrari",
    icon: "/teams/ferrariLogo.svg",
  },
  {
    name: "Red Bull",
    description: "Max Verstappen / Isack Hadjar",
    href: "/statsBattle?mode=team&left=redbull",
    icon: "/teams/redbullLogo.svg",
  },
  {
    name: "McLaren",
    description: "Lando Norris / Oscar Piastri",
    href: "/statsBattle?mode=team&left=mclaren",
    icon: "/teams/mclarenLogo.svg",
  },
  {
    name: "Alpine",
    description: "Pierre Gasly / Franco Colapinto",
    href: "/statsBattle?mode=team&left=alpine",
    icon: "/teams/aplineLogo.svg",
  },
  {
    name: "Aston Martin",
    description: "Fernando Alonso / Lance Stroll",
    href: "/statsBattle?mode=team&left=astonmartin",
    icon: "/teams/astonmartinLogo.svg",
  },
  {
    name: "Racing Bulls",
    description: "Liam Lawson / Arvid Lindblad",
    href: "/statsBattle?mode=team&left=racingbulls",
    icon: "/teams/rbLogo.svg",
  },
  {
    name: "Audi",
    description: "Nico Hulkenberg / Gabriel Bortoleto",
    href: "/statsBattle?mode=team&left=audi",
    icon: "/teams/audiLogo.svg.png",
  },
  {
    name: "Cadillac",
    description: "Sergio Perez / Valtteri Bottas",
    href: "/statsBattle?mode=team&left=cadillac",
    icon: "/teams/cadillacLogo.svg",
  },
  {
    name: "Williams",
    description: "Carlos Sainz / Alexander Albon",
    href: "/statsBattle?mode=team&left=williams",
    icon: "/teams/williamsLogo.svg",
  },
  {
    name: "Haas",
    description: "Esteban Ocon / Oliver Bearman",
    href: "/statsBattle?mode=team&left=haas",
    icon: "/teams/haasLogo.svg",
  },
];


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-50 bg-black/90 pt-2 pb-2 border-b border-white/10 backdrop-blur-md">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/home" className="-m-1.5 p-1.5">
            <Image
              src="/anotherPic/f1logo.jpg"
              alt=""
              width={150}
              height={32}
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-8">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-white hover:drop-shadow-[0_0_4px_rgba(255,255,255,1)]">
              TEAMS
              <ChevronDownIcon
                aria-hidden="true"
                className="size-5 flex-none text-gray-500"
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute left-1/2 z-50 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-3xl bg-black transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-white/10"
                  >
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-700/50 group-hover:bg-gray-700">
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-auto">
                      <Link
                        href={item.href}
                        className="block font-semibold text-white"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </Link>
                      <p className="mt-1 text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <Link
            href="/home"
            className="text-sm/6 font-semibold text-white hover:drop-shadow-[0_0_4px_rgba(255,255,255,1)]"
          >
            HOME
          </Link>
          <Link
            href="/schedule"
            className="text-sm/6 font-semibold text-white hover:drop-shadow-[0_0_4px_rgba(255,255,255,1)]"
          >
            SCHEDULE
          </Link>
          <Link
            href="/statsBattle"
            className="text-sm/6 font-semibold text-white hover:drop-shadow-[0_0_4px_rgba(255,255,255,1)]"
          >
            STATS BATTLE
          </Link>
          <Link
            href="/history"
            className="text-sm/6 font-semibold text-white hover:drop-shadow-[0_0_4px_rgba(255,255,255,1)]"
          >
            HISTORY
          </Link>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <SignInBtn />
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black/95 p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <Link href="/home" className="-m-1.5 p-1.5">
              <span className="sr-only">F1 Hub</span>
              <Image
                src="/anotherPic/f1logo.jpg"
                alt=""
                width={120}
                height={28}
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="mt-8 space-y-6">
            <div className="space-y-2">
              <Link
                href="/home"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
              >
                Home
              </Link>
              <Link
                href="/schedule"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
              >
                Schedule
              </Link>
              <Link
                href="/statsBattle"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
              >
                Stats Battle
              </Link>
              <Link
                href="/history"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
              >
                History
              </Link>
              <Disclosure as="div" className="-mx-3">
                <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-white hover:bg-white/5">
                  Teams
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="size-5 flex-none group-data-open:rotate-180"
                  />
                </DisclosureButton>
                <DisclosurePanel className="mt-2 space-y-2">
                  {[...products].map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as={Link}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-white hover:bg-white/5"
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                </DisclosurePanel>
              </Disclosure>
            </div>

            <div className="border-t border-white/10 pt-6">
              <SignInBtn variant="mobile" />
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

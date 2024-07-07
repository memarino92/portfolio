import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons'
import husbandAndWife from '@/images/photos/husband-and-wife.jpg'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function BioLink({ href, children }) {
  return (
    <Link
      href={href}
      className="mx-1 text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
    >
      {children}
    </Link>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

function BriefcaseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

export const metadata = {
  title: 'About',
  description: `I'm Michael, a software engineer based in Richmond, Virginia.`,
}

function Resume() {
  let resume = [
    {
      company: 'Virginia Credit Union',
      title: 'Software Engineer',
      start: '2022',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear(),
      },
    },
    {
      company: 'Technology Integration Group',
      title: 'Software Developer',
      start: '2020',
      end: '2022',
    },
  ]

  return (
    <>
      <h2 className="mt-8 flex border-t border-zinc-100 pt-8 text-sm font-semibold text-zinc-900 dark:border-zinc-700/40 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                aria-label={`${role.start.label ?? role.start} until ${
                  role.end.label ?? role.end
                }`}
              >
                <time dateTime={role.start.dateTime ?? role.start}>
                  {role.start.label ?? role.start}
                </time>{' '}
                <span aria-hidden="true">—</span>{' '}
                <time dateTime={role.end.dateTime ?? role.end}>
                  {role.end.label ?? role.end}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
    </>
  )
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={husbandAndWife}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            I&apos;m Michael, a software engineer based in Richmond, Virginia.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              My love of programming started at an early age. In third grade, my
              friend Sam and I tried to memorize the alphabet in binary out of a
              Farmers’ Almanac (we were sure it would come in handy).
            </p>
            <p>
              Later, I learned how variables, loops, and other basic (or BASIC
              😉) programming concepts from a Windows 95 game by Interplay
              called
              <BioLink href="https://www.youtube.com/uBYz9syhNAA">
                &lsquo;Learn to Program BASIC&lsquo;.
              </BioLink>
              I would carry around a notebook to scribble JavaScript in to try
              out when I got home from school (and make cool cursor trails on my
              MySpace page).
            </p>
            <p>
              I spent the next two decades as what I would call a &lsquo;hobby
              technologist&lsquo;, experimenting with gadgets and gizmos,
              building automations using exisiting tooling. I persued careers in
              music and restaurants before coming back to relearn programming
              and finding my way into the industry.
            </p>
            <p>
              Today, I build full-stack web applications using a variety of
              technologies, mostly centered around the .NET and Typescript
              ecosystems with an emphasis on embracing modern web APIs. I&apos;m
              a contributor to open source projects such as
              <BioLink href="https://astro.build/">Astro</BioLink>and
              <BioLink href="https://redwoodjs.com/">RedwoodJS,</BioLink> and
              love sharing what I&apos;ve learned by speaking at local meetups
              and conferences such as
              <BioLink href="https://www.meetup.com/rva-js/">RVA.js</BioLink>
              and
              <BioLink href="https://rvasdug.org/">RVASDUG</BioLink>.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink
              href="https://github.com/memarino92"
              icon={GitHubIcon}
              className="mt-4"
            >
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="https://linkedin.com/in/michael-marino-8980b81a7/"
              icon={LinkedInIcon}
              className="mt-4"
            >
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:michael@michaelmarino.dev"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              michael@michaelmarino.dev
            </SocialLink>
            <Resume />
          </ul>
        </div>
      </div>
    </Container>
  )
}

import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import { parseNumber } from './app/_utils'
import { Link as NextLink } from '@nextui-org/link'
import { Snippet } from '@nextui-org/snippet'
import CodeHeader from '@/app/_components/server-only/CodeHeader'
import { DetailedHTMLProps, HTMLAttributes, createElement } from 'react'
import clsx from 'clsx'
import { Card, CardBody } from '@nextui-org/card'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: (props: React.HTMLAttributes<HTMLAnchorElement>) => <Link {...props} />,
    blockquote: (props) => (
      <blockquote
        className="my-6 rounded-xl border border-default-200 bg-default-200/20 px-4 py-3 italic dark:border-default-100 [&>p]:m-0"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="inline-block h-fit rounded-small  bg-transparent px-0 py-0 font-mono text-xs font-normal text-sky-400 md:text-small"
        // className="inline-block h-fit whitespace-nowrap rounded-small bg-transparent px-0 py-0 font-mono text-small font-normal text-sky-400 before:content-['`'] after:content-['`']"
        // className="inline-block h-fit whitespace-nowrap rounded-small bg-transparent "
        {...props}
      />
    ),
    h1: (props) => {
      return (
        <HeaderWithLink
          props={props}
          level={1}
          className="mb-5 mt-10 text-3xl font-bold leading-tight text-slate-900 dark:text-slate-200 md:text-5xl"
        />
      )
    },
    h2: (props) => {
      return (
        <HeaderWithLink
          props={props}
          level={2}
          className="my-10 text-xl  font-bold text-slate-900 dark:text-slate-200 md:text-3xl"
        />
      )
    },
    h3: (props) => {
      return (
        <HeaderWithLink
          props={props}
          level={3}
          className="mb-8 mt-10 text-lg font-semibold text-slate-900 dark:text-slate-200 md:text-2xl"
        />
      )
    },
    h4: (props) => {
      return (
        <HeaderWithLink
          props={props}
          level={4}
          className="text-md my-2 font-semibold leading-6 text-slate-900   dark:text-slate-200"
        />
      )
    },
    hr: (props) => (
      <div
        {...props}
        className="my-8 h-px w-full bg-slate-400 dark:bg-default-100"
      />
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        alt={props.alt ?? 'abacus-image'}
        src={props.src ?? '/abacus.png'}
        width={parseNumber(props.width, 100)}
        height={parseNumber(props.height, 100)}
      />
    ),
    li: (props) => {
      // console.info('props', )
      // if (props.children[0].props?.children[0].props?.children[0] === '[]') {
      // if text is link
      let child = props.children
      if (
        typeof props.children === 'string' &&
        props.children.startsWith('http')
      ) {
        child = <Link href={props.children}>{props.children}</Link>
      }
      return (
        <li className=" sm:text-md my-5  mb-2 text-sm font-normal leading-7 md:text-lg  [&::marker]:font-semibold [&:before]:mr-6 [&:before]:content-['-']">
          {child}
        </li>
      )
    },
    ol: (props) => {
      return (
        <ul
          className="mb-5 ml-5 mt-2 list-decimal [&>li:before]:mr-4 [&>li:before]:content-['']"
          {...props}
        />
      )
    },
    ul: (props) => {
      return <ul className="my-5 list-none [blockquote_&]:my-0" {...props} />
    },
    p: (props) => (
      <p
        className="sm:text-md my-5 text-sm font-normal leading-7 md:text-lg"
        {...props}
      />
    ),
    pre: (props) => {
      return (
        <Snippet
          size="sm"
          radius="none"
          hideSymbol
          className="flex w-full"
          variant="bordered"
          style={{
            backgroundColor: '#282c34',
          }}
        >
          {/* <span className="flex whitespace-pre-wrap p-7 text-sm leading-6"> */}
          <span className="flex whitespace-pre-wrap text-sm leading-6">
            {props.children}
          </span>
        </Snippet>
      )
    },

    table: (props) => (
      <table className="w-full border-collapse">{props.children}</table>
    ),
    th: (props) => (
      <th className="whitespace-nowrap border border-gray-200 bg-gray-100 px-4 py-2">
        {props.children}
      </th>
    ),
    td: (props) => (
      <td className="border border-gray-200 px-4 py-2">{props.children}</td>
    ),
    CodeHeader,
  }
}

const Link = ({
  href,
  children,
}: {
  href?: string
  children?: React.ReactNode
}) => {
  return (
    <NextLink
      href={href}
      // isExternal={!href?.startsWith('/') && !href?.includes(APP_DOMAIN)}
      isExternal={false}
      showAnchorIcon
      className="text-sm text-sky-500 underline underline-offset-4 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-100 md:text-sm"
    >
      {children}
    </NextLink>
  )
}

// https://developers.google.com/style/headings-targets
const HeaderWithLink = ({
  props,
  level,
  className,
}: {
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
  level: number
  className: string
}) => {
  const text = typeof props.children === 'string' ? props.children : ''

  const slug = text.toLowerCase().replaceAll(' ', '-')
  return createElement(
    `h${level}`,
    {
      ...props,
      id: slug,
      className: clsx(props.className, className),
    },
    [
      createElement(
        'a',
        { href: `#${slug}`, key: props.id ?? slug },
        props.children,
      ),
    ],
  )
}

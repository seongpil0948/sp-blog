import dirTree from 'directory-tree'
import type {
  DirectoryTree,
  DirectoryTreeOptions,
  DirectoryTreeCallback,
} from 'directory-tree'
import { TreeSectionProps } from '../_components/client-only/tree-section'

type TDirCustom = {
  href: string
}

const callback: DirectoryTreeCallback<TDirCustom> = (item, path) => {
  if (path.includes('[lang]')) {
    path = path.split('[lang]')[1]
    // remove any extension from path
    path = path.replace(/\.[^/.]+$/, '')
    path = path.replace(/\/index$/, '')
    path = path.replace(/\/content$/, '')
  }
  if (!path || path === '') {
    path = '/'
  }
  item.custom = {
    href: path,
  }
}

export interface IGetTreeArgs {
  dir: string
  options?: DirectoryTreeOptions
}
export function getTree(args: IGetTreeArgs) {
  const libTree = dirTree(args.dir, {exclude: /home/,...args.options}, undefined, callback)
  const tree =  dirTreeToTree(libTree)
  return tree
}


function dirTreeToTree(obj: DirectoryTree<TDirCustom>): TreeSectionProps | undefined {
  // obj.name = dirTree.name.replace('.mdx', '').replace('.tsx', '')
  if ((obj.type && obj.type === 'file') || !obj.custom || !obj.custom.href) return 
  if (obj.path.includes('/_')) return
  if (obj.name.startsWith('_')) return
  return {
    label: obj.name,
    href: obj.custom.href,
    // children: obj.children?.map(dirTreeToTree).filter(o => !o.label.includes('content')),
    children: obj.children?.map(dirTreeToTree).filter(o => o) as TreeSectionProps[] ?? [],
  }
}


export function getOnlyFiles(dir: string, options: DirectoryTreeOptions) {
  const tree = dirTree(dir, options)
  const files :string[] = []
  tree.children?.forEach((item) => {
    const p = item.path
    if (isAssetFile(p)) {
      files.push(assetToHref(p))
    }
  })
  return files
}

const isAssetFile = (path: string) => {
  return path.includes('public')
}

const assetToHref = (path: string) => {
  return path.split('public')[1]
}
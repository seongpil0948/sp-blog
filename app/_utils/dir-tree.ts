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

export function getTree(dir: string, options?: DirectoryTreeOptions) {
  const libTree = dirTree(dir, options, undefined, callback)
  return dirTreeToTree(libTree)
  
}
function dirTreeToTree(obj: DirectoryTree<TDirCustom>): TreeSectionProps | undefined {
  // obj.name = dirTree.name.replace('.mdx', '').replace('.tsx', '')
  if ((obj.type && obj.type === 'file') || !obj.custom || !obj.custom.href) return 
  if (obj.path.includes('/_')) return
  return {
    label: obj.name,
    href: obj.custom.href,
    // children: obj.children?.map(dirTreeToTree).filter(o => !o.label.includes('content')),
    children: obj.children?.map(dirTreeToTree).filter(o => o) as TreeSectionProps[] ?? [],
  }
}
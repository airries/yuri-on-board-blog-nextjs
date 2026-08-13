const TableWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="article-table my-7 w-full overflow-x-auto border-b border-b-paper-border border-t-2 border-t-gray-700 dark:border-gray-700">
      <table className="m-0 min-w-[42rem]">{children}</table>
    </div>
  )
}

export default TableWrapper

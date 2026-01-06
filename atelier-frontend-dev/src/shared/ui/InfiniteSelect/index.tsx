// const PAGE_SIZE = 20;

// interface Props extends SelectProps {}

// TODO: refactor to common Infinite select.
// const ProjectSelect: FC<Props> = ({ onChange, ...rest }: Props) => {
//   const [searchString, setSearchString] = useState<string>("");
//
//   const debouncedValue = useDebounce(searchString);
//
//   const { data, fetchNextPage } = useInfiniteQuery({
//     queryKey: ["project-select", debouncedValue],
//     // queryFn: async (params) =>
//     //   // ProjectsService.searchProjects({
//     //   //   page: params.pageParam,
//     //   //   size: PAGE_SIZE,
//     //   //   searchCriteria: {
//     //   //     searchInput: debouncedValue,
//     //   //   },
//     //   // }),
//     initialPageParam: 1,
//     // getNextPageParam: (lastPage) => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined),
//     placeholderData: keepPreviousData,
//   });
//
//   const options = data?.pages.flatMap((page) => page.content) || [];
//
//   const onDropdownScroll = (e: UIEvent<HTMLDivElement>) => {
//     const { currentTarget } = e;
//     if (currentTarget.scrollTop + currentTarget.clientHeight >= currentTarget.scrollHeight) {
//       void fetchNextPage();
//     }
//   };
//
//   const onValueSelect = (id: number, option: DefaultOptionType | DefaultOptionType[] | undefined) => {
//     setSearchString("");
//     const project = options.find((project) => project.id === id);
//     onChange?.(project, option);
//   };
//
//   return (
//     <Select
//       {...rest}
//       onPopupScroll={onDropdownScroll}
//       filterOption={false}
//       onSearch={setSearchString}
//       onChange={onValueSelect}
//       popupMatchSelectWidth={false}
//       dropdownStyle={{
//         width: 265,
//       }}>
//       {options.map((project) => (
//         <Select.Option key={project.id} value={project.id}>
//           {project.id} • {project.name}
//         </Select.Option>
//       ))}
//     </Select>
//   );
// };
//
// export default ProjectSelect;

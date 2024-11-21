const backgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23ddd6fe'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`

/* ========================================================================
                               RouterFallback              
======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// This component is passed to RouterProvider:
//
//   <RouterProvider router={router} fallbackElement={<RouterFallback />} />
//
// It would be invoked in cases where the user manually refreshed the browser,
// and the page that they refreshed had a loader.
//
///////////////////////////////////////////////////////////////////////////

export const RouterFallback = () => {
  const spinner = (
    <div
      aria-label='Loading'
      className='pointer-events-none fixed inset-0 flex items-center justify-center'
    >
      <div className='relative flex h-20 w-20'>
        <i className='absolute h-full w-full animate-[custom-spinner-spin_0.8s_ease_infinite] rounded-full border-[6px] border-solid border-b-violet-800 border-l-transparent border-r-transparent border-t-transparent'></i>
        <i className='absolute h-full w-full animate-[custom-spinner-spin_0.8s_linear_infinite] rounded-full border-[6px] border-dotted border-b-violet-800 border-l-transparent border-r-transparent border-t-transparent opacity-75'></i>
      </div>
    </div>
  )

  /* ======================
          return
  ====================== */

  return (
    <div
      className={`mx-auto flex w-full flex-1 flex-wrap`}
      style={{ backgroundImage }}
    >
      <div className='relative mx-auto w-full flex-1 p-6 2xl:container'>
        {spinner}
      </div>
    </div>
  )
}

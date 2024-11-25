import { HR, Page, PageContainer, Waves } from 'components'

import { Square } from 'dc-react-ts-test-library'
// import 'dc-react-ts-test-library/dist/main.css'

/* ========================================================================
                                PageHome
======================================================================== */

const PageHome = () => {
  /* ======================
          return
  ====================== */

  return (
    <Page>
      <Waves />

      <PageContainer>
        <h1
          className='text-center text-5xl font-black'
          style={{ position: 'relative', marginBottom: 24 }}
        >
          <span
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              textShadow:
                '0px 0px 1px rgba(0,0,0,1), 0px 0px 1px rgba(0,0,0,1)',
              width: '100%',
              height: '100%'
            }}
          >
            Home
          </span>
          <span
            className='bg-gradient-to-r from-violet-700 to-sky-400 bg-clip-text text-transparent'
            style={{
              position: 'relative'
            }}
          >
            Home
          </span>
        </h1>

        <HR style={{ marginBottom: 50 }} />

        <div className='square mb-6' />

        <div className='my-circle mb-6' />

        <Square />
      </PageContainer>
    </Page>
  )
}

export default PageHome

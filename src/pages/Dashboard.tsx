import img1 from '../assets/div.MuiBox-root.png'
import img2 from '../assets/iconly-glass-discount.svg.png'
import img3 from '../assets/div.MuiBox-root (1).png'
import img4 from '../assets/Image (14).png'
import img5 from '../assets/div.MuiBox-root (2).png'
import AreaChart from '@/components/AreaChart'
import { MoveRight } from 'lucide-react'


const Dashboard = () => {
  return (
    <main>
      <section className='p-6 bg-gray-50 w-full min-h-screen'>
        <h1 className='font-bold text-3xl mb-6 text-slate-800'>Dashboard</h1>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <aside className='lg:col-span-2 flex flex-col gap-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='bg-[#FEF3F2] p-5 rounded-xl flex items-center gap-4 shadow-sm border border-red-100'>
                <div className='p-3 bg-white rounded-lg shadow-inner'><img src={img1} className="w-8 h-8" alt="sales" /></div>
                <div>
                  <p className='text-sm text-gray-600 font-medium'>Sales</p>
                  <h1 className='text-2xl font-bold text-slate-900'>$152k</h1>
                </div>
              </div>

              <div className='bg-[#FFFAEB] p-5 rounded-xl flex items-center gap-4 shadow-sm border border-amber-100'>
                <div className='p-3 bg-white rounded-lg shadow-inner'><img src={img2} className="w-8 h-8" alt="cost" /></div>
                <div>
                  <p className='text-sm text-gray-600 font-medium'>Cost</p>
                  <h1 className='text-2xl font-bold text-slate-900'>$99.7k</h1>
                </div>
              </div>

              <div className='bg-[#F0FDF9] p-5 rounded-xl flex items-center gap-4 shadow-sm border border-emerald-100'>
                <div className='p-3 bg-white rounded-lg shadow-inner'><img src={img3} className="w-8 h-8" alt="profit" /></div>
                <div>
                  <p className='text-sm text-gray-600 font-medium'>Profit</p>
                  <h1 className='text-2xl font-bold text-slate-900'>$32.1k</h1>
                </div>
              </div>
            </div>

            <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
              <h2 className='font-bold text-lg mb-4'>Revenue Analytics</h2>
              <AreaChart />
            </div>
          </aside>
          <aside className='lg:col-span-1'>
            <div className='bg-white border border-gray-200 p-5 rounded-xl shadow-sm h-full'>
              <div className='flex items-center justify-between mb-6'>
                <h1 className='font-bold text-lg'>Top selling products</h1>
                <button className='flex items-center gap-1 text-blue-600 text-sm font-semibold hover:underline cursor-pointer'>
                  See All <MoveRight size={16} />
                </button>
              </div>
              <div className='grid grid-cols-1 gap-2'>
                <div className='flex  justify-between'>
                  <div className='flex items-center gap-1'>
                    <img src={img5} alt="" />
                    <div>
                      <h1 className='font-semibold'>Healthcare Erbology</h1>
                      <p>in Accessories</p>
                    </div>
                  </div>
                  <div className='text-end'>
                    <h1 className='text-green-500 font-semibold text-[19px]'>13,153</h1>
                    <p className='text-gray-400'>in sales</p>
                  </div>
                </div>
                <div className='flex  justify-between'>
                  <div className='flex items-center gap-1'>
                    <img src={img5} alt="" />
                    <div>
                      <h1 className='font-semibold'>Healthcare Erbology</h1>
                      <p>in Accessories</p>
                    </div>
                  </div>
                  <div className='text-end'>
                    <h1 className='text-green-500 font-semibold text-[19px]'>13,153</h1>
                    <p className='text-gray-400'>in sales</p>
                  </div>
                </div>
                <div className='flex  justify-between'>
                  <div className='flex items-center gap-1'>
                    <img src={img5} alt="" />
                    <div>
                      <h1 className='font-semibold'>Healthcare Erbology</h1>
                      <p>in Accessories</p>
                    </div>
                  </div>
                  <div className='text-end'>
                    <h1 className='text-green-500 font-semibold text-[19px]'>13,153</h1>
                    <p className='text-gray-400'>in sales</p>
                  </div>
                </div>
                <div className='flex  justify-between'>
                  <div className='flex items-center gap-1'>
                    <img src={img5} alt="" />
                    <div>
                      <h1 className='font-semibold'>Healthcare Erbology</h1>
                      <p>in Accessories</p>
                    </div>
                  </div>
                  <div className='text-end'>
                    <h1 className='text-green-500 font-semibold text-[19px]'>13,153</h1>
                    <p className='text-gray-400'>in sales</p>
                  </div>
                </div>
                <div className='flex  justify-between'>
                  <div className='flex items-center gap-1'>
                    <img src={img5} alt="" />
                    <div>
                      <h1 className='font-semibold'>Healthcare Erbology</h1>
                      <p>in Accessories</p>
                    </div>
                  </div>
                  <div className='text-end'>
                    <h1 className='text-green-500 font-semibold text-[19px]'>13,153</h1>
                    <p className='text-gray-400'>in sales</p>
                  </div>
                </div>
                <div className='flex  justify-between'>
                  <div className='flex items-center gap-1'>
                    <img src={img5} alt="" />
                    <div>
                      <h1 className='font-semibold'>Healthcare Erbology</h1>
                      <p>in Accessories</p>
                    </div>
                  </div>
                  <div className='text-end'>
                    <h1 className='text-green-500 font-semibold text-[19px]'>13,153</h1>
                    <p className='text-gray-400'>in sales</p>
                  </div>
                </div>
                <div className='flex  justify-between'>
                  <div className='flex items-center gap-1'>
                    <img src={img5} alt="" />
                    <div>
                      <h1 className='font-semibold'>Healthcare Erbology</h1>
                      <p>in Accessories</p>
                    </div>
                  </div>
                  <div className='text-end'>
                    <h1 className='text-green-500 font-semibold text-[19px]'>13,153</h1>
                    <p className='text-gray-400'>in sales</p>
                  </div>
                </div>
                <div className='flex  justify-between'>
                  <div className='flex items-center gap-1'>
                    <img src={img5} alt="" />
                    <div>
                      <h1 className='font-semibold'>Healthcare Erbology</h1>
                      <p>in Accessories</p>
                    </div>
                  </div>
                  <div className='text-end'>
                    <h1 className='text-green-500 font-semibold text-[19px]'>13,153</h1>
                    <p className='text-gray-400'>in sales</p>
                  </div>
                </div>
              </div>


              {/* <div className='space-y-4'>
                <p className='text-gray-400 text-sm text-center py-10'>No products found...</p>
              </div> */}
            </div>
          </aside>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 my-2'>
          <aside>
            <div className='bg-white border border-gray-200 p-5 rounded-xl shadow-sm h-full'>
              <h1 className='font-bold text-[18px] mb-2'>Recent Transactions</h1>
              <table className='w-full'>
                <thead className='border-b-2 '>
                  <tr className='font-semibold text-gray-500 py-1'>
                    <td>Name</td>
                    <td>Date</td>
                    <td>Amount</td>
                    <td className='text-center'>Status</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='font-bold py-2'>Jagarnath S.</td>
                    <td>24.06.2025</td>
                    <td>$124.97</td>
                    <td className='py-1'><div className='text-[#06A561] bg-[#C4F8E2] rounded-sm m-auto text-center'>Paid</div></td>
                  </tr>
                  <tr>
                    <td className='font-bold py-2'>Anand G.</td>
                    <td>24.07.2025</td>
                    <td>$124.97</td>
                    <td className='py-1'><div className='text-[#5A607F] bg-[#E6E9F4] rounded-sm m-auto text-center'>Pending</div></td>
                  </tr>
                  <tr>
                    <td className='font-bold py-2'>Kartik S.</td>
                    <td>24.06.2025</td>
                    <td>$124.97</td>
                    <td className='py-1'><div className='text-[#06A561] bg-[#C4F8E2] rounded-sm m-auto text-center'>Paid</div></td>
                  </tr>
                  <tr>
                    <td className='font-bold py-2'>Rakesh S.</td>
                    <td>24.06.2025</td>
                    <td>$124.97</td>
                    <td className='py-1'><div className='text-[#5A607F] bg-[#E6E9F4] rounded-sm m-auto text-center'>Pending</div></td>
                  </tr>
                  <tr>
                    <td className='font-bold py-2'>Anup S.</td>
                    <td>24.07.2025</td>
                    <td>$124.97</td>
                    <td className='py-1'><div className='text-[#06A561] bg-[#C4F8E2] rounded-sm m-auto text-center'>Paid</div></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </aside>
          <aside>
            <div className='bg-white border border-gray-200 p-5 rounded-xl shadow-sm h-full'>
              <h1 className='font-bold text-[18px] mb-2'>Top Products by Units Sold</h1>
              <table className='w-full'>
                <thead className='border-b-2 '>
                  <tr className='font-semibold text-gray-500 py-1'>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Units</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='font-bold flex items-center gap-1 py-2'>
                      <img src={img4} alt="" />
                      <h1>Men Grey Hoodie</h1>
                    </td>
                    <td>$49.90</td>
                    <td>204</td>
                  </tr>
                  <tr>
                    <td className='font-bold flex items-center gap-1 py-2'>
                      <img src={img4} alt="" />
                      <h1>Men Grey Hoodie</h1>
                    </td>
                    <td>$49.90</td>
                    <td>204</td>
                  </tr>
                  <tr>
                    <td className='font-bold flex items-center gap-1 py-2'>
                      <img src={img4} alt="" />
                      <h1>Men Grey Hoodie</h1>
                    </td>
                    <td>$49.90</td>
                    <td>204</td>
                  </tr>
                  <tr>
                    <td className='font-bold flex items-center gap-1 py-2'>
                      <img src={img4} alt="" />
                      <h1>Men Grey Hoodie</h1>
                    </td>
                    <td>$49.90</td>
                    <td>204</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default Dashboard
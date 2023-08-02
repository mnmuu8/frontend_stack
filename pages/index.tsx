import { NextPage } from 'next'
import Layout from '@/components/organisms/Layout'
import Chart from '@/components/uikit/Chart'
import RankTable from '@/components/uikit/RankTable'
import StackForm from '@/components/molecules/StackForm';

const index: NextPage = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  // TODO: APIデータ受け取り。後々実装
  const generateStudyTimeData = (daysInMonth: number): number[] => {
    const studyTimeData: number[] = [];
    for (let i = 0; i < daysInMonth; i++) {
      studyTimeData.push(Math.floor(Math.random() * 16));
    }
    return studyTimeData;
  }

  const generateLabels = (daysInMonth: number): string[] => {
    const stackLabels: string[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      stackLabels.push(i.toString());
    }
    return stackLabels;
  };

  const barData = generateStudyTimeData(daysInMonth);
  const barLabels = generateLabels(daysInMonth);

  const arcData = [30, 20, 40, 10, 5, 50];
  const arcLabels = ["Ruby on Rails", "PHP", "React", "Next", "TypeScript", "WordPress"];
  const arcBorderColor = ["#ffdad3", "#f9c5f7", "#b3f7bb", "#b4eaf7", "#faf49c", "#c9bbf7"];
  const arcBackgroundColor = ["#ffdad3", "#f9c5f7", "#b3f7bb", "#b4eaf7", "#faf49c", "#c9bbf7"]

  return (
    <Layout>
      <div className='dashboard-page'>
        <div className='text-2xl text-blue-900 font-bold mb-6'>Stacked Graph</div>
        <div className='bg-white shadow-md p-6 w-full mb-10'>
          <div className='w-8/12 m-auto flex justify-center'>
            <Chart labels={barLabels} label={"時間"} data={barData} bdColor={["rgb(39, 119, 169)"]} bgColor={["rgb(240, 248, 250)"]} bdwidth={1} text={currentMonth + "月の学習時間"} type={"bar"} />
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='w-[48%] flex flex-col'>
            <div className='text-2xl text-blue-900 font-bold mb-6'>Skill Graph</div>
            <div className='bg-white shadow-md p-6 flex-grow'>
              <div className='w-8/12 m-auto'>
              <Chart labels={arcLabels} label={"学習時間"} data={arcData} bdColor={arcBorderColor} bgColor={arcBackgroundColor} bdwidth={1} text={"積み上げスキル"} type={"pie"} />
              </div>
            </div>
          </div>
          <div className='w-[48%] flex flex-col'>
            <div className='text-2xl text-blue-900 font-bold mb-6'>Stacking Time Ranking</div>
            <div className='bg-white shadow-md p-6 flex-grow'>
              <RankTable />
            </div>
          </div>
        </div>
      </div>
      <StackForm />
    </Layout>
  )
}

export default index
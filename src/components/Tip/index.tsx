import { Typography, notification } from 'antd'
import { FC, useEffect } from 'react'

const { Paragraph, Link, Text } = Typography

const Tip: FC = () => {
  useEffect(() => {
    openNotification(3)
  }, [])

  const openNotification = (duration = 5) => {
    notification.info({
      message: `温馨提示`,
      description: (
        <div className="text-justify">
          <Paragraph>
            该拾取器使用高德 Web 服务 API，输出坐标为 <Text type="success">WGS84</Text>，使用过程中如提示{' '}
            <Text type="danger">[10003] DAILY_QUERY_OVER_LIMIT</Text>
            ，请前往高德开放平台
            <Link href="https://lbs.amap.com/dev/key" target="_blank">
              申请Key
            </Link>{' '}
            并输入。
          </Paragraph>
          <Paragraph italic>
            <Text type="warning">请放心使用，不会保存你的 Key 信息！！</Text>
          </Paragraph>
        </div>
      ),
      placement: 'top',
      duration,
      style: {
        width: 345,
      },
    })
  }

  return (
    <div
      className="absolute top-[10px] left-[10px] w-[29px] h-[29px] leading-[29px] rounded-[4px] font-bold text-center text-[16px] bg-white cursor-pointer"
      style={{
        boxShadow: '0 0 0 2px rgba(0,0,0,.1)',
        backgroundImage:
          'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAABQdJREFUeF7tnT2sFVUUhT86oyRaWdBYSGKCJVQ0QkMEo9HCRDttJBAotNBQqRWBAguNRBvtNLHQmPjbKA0VdEBiggWNBRUmQijJJDd55IHkvvXOOvfuM+vWs/Y+59sra+bdN3dmB/nMmsCOWe8+mycGmLkJYoAYYOYEZr79JEAMMHMCM99+EiAGmDmBmW9/xAQ4ALwCPAc83mi+d4C/gB+BPxvVXIsyoxlgL3DJTHYfcNnco1v5kQywB7jaidzzwLVOvaxtRjLAp8AJK62N4p8BJzv1srYZyQC/AC9aaW0U/xU43KmXtc1IBvgDmC4Ae3ymC8GDPRq5e8QAGuEYQONmVSUBBLxJAAHa4ruAnAI0djZVEkBAmwQQoCUBNGhuVRJAIJwEEKAlATRoblUSQCCcBBCgJQE0aG5VEkAgnAQQoCUBNGhuVRJAIJwEEKAlATRobtXnwDF3k0X988DxTr2sbUZKgLeAr6y0Noq/DXzdqZe1zUgGmEB9BHxoJQYfL/qY2/QpP5oBJmqvA6dMdwWfBr7rM5o+XUY0QB9yg3SJAQYZpLqNGEAlN4guBhhkkOo2YgCV3CC6GGCQQarbiAFUcoPoYoBBBqluIwZQyQ2iiwEGGaS6jRhAJTeILgYYZJDqNmIAldwguooGeBp4Bnii4wxuAzeAmx17dmlVzQDTQ5pe7kLm4U2+Bd5cYf/mrSsZ4AowPZtn1Z8vgaOrXkSr/lUM0ONOn60wHeauoCoG+AZ4YysTMh87zKmgigF63vO/jHfyiJhlKDU8JgZoCPP+UkkADWwSQOMmq5IAMrpHC5MAGtgkgMZNViUBZHRJAAe6JICD6iNqJgFMwHMNoIFNAmjcZFUSQEY3xjVAz9/+L4M6CbAMpYbHvAN80bDedkvFANslKOh/Aw4JOockBnBQXaLm9GSO6VUtLd8ItkTbBw6JARRqZk3PC8UYwDxMpXwMIFCr8j3AMluLAZahtOmYGECAlucEatDcqiSAQDgJIEBLAmjQ3KokgEA4CSBASwJo0NyqJIBAOAkgQEsCaNDcqiSAQDgJIEBLAmjQ3KokgEA4CSBASwJo0NyqJIBAOAkgQEsCaNDcqiSAQDgJIEBLAmjQ3KokgEA4CSBASwJo0NyqJIBAOAkgQEsCaNDcqiSAQDgJIEBLAmjQ3KokgEA4CSBASwJo0NyqJIBAuFoC7Fz8QPTZhzwt/AXggMBAkUw/DbuwSTg9Ufxv4HfgP6XoKjSVDLB/8eLmXasAtYWe/yxeYH1xC5qVHVrFAE8Ct1ZGSWv8FPCvJu2nqmKAM8D7/bA06XQW+KBJJWORKgb4HnjVyMFR+gfgNUfhljWrGKDnFX4rviWeIRADtBr3g3VigIZskwANYd5fKglgAlvl28IYIAbwEWhYOaeAhjBzCjDB3FQ2F4ENOScBGsJMAphgJgF8YH8CjvjKWyr/DLxkqdywaJW/As4B7zbcd49SnwDv9Wi0nR5VDDD9n3+6Dqj0Obj4LmCt11zFABPEvcCltaa5sbh9wOUKa61kgInnHuAYsBt4bM0A3wWuA+eBa2u2tv9dTjUDVOFaZp0xQJlReRYaA3i4lqkaA5QZlWehMYCHa5mqMUCZUXkWGgN4uJapGgOUGZVnoTGAh2uZqjFAmVF5FhoDeLiWqRoDlBmVZ6ExgIdrmaoxQJlReRYaA3i4lqkaA5QZlWehMYCHa5mqMUCZUXkWeg8GuryBUT88BwAAAABJRU5ErkJggg==")',
        backgroundSize: '70%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      onClick={() => openNotification()}
    >
      {/* <span>i</span> */}
    </div>
  )
}

export default Tip

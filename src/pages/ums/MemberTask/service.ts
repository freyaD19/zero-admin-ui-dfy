import {request} from 'umi';
import type { MemberTaskListParams, MemberTaskListItem } from './data.d';
import moment from 'moment/moment';

// 添加会员任务
export async function addMemberTask(params: MemberTaskListItem) {
  params.startTime = moment(params.startTime).format('YYYY-MM-DD HH:mm:ss');
  params.endTime = moment(params.endTime).format('YYYY-MM-DD HH:mm:ss');
  return request('/api/ums/task/addMemberTask', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除会员任务
export async function removeMemberTask(ids: number[]) {
  return request('/api/ums/task/deleteMemberTask?ids=' + ids.join(','), {
    method: 'GET',
  });
}


// 更新会员任务
export async function updateMemberTask(params: MemberTaskListItem) {
  params.startTime = moment(params.startTime).format('YYYY-MM-DD HH:mm:ss');
  params.endTime = moment(params.endTime).format('YYYY-MM-DD HH:mm:ss');
  return request('/api/ums/task/updateMemberTask', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 批量更新会员任务状态
export async function updateMemberTaskStatus(params: { ids: number[], status: number }) {
  return request('/api/ums/task/updateMemberTaskStatus', {
    method: 'POST',
    data: {
      ...params,
    },

  });
}


// 查询会员任务详情
export async function queryMemberTaskDetail(id: number) {
  return request('/api/ums/task/queryMemberTaskDetail?id=' + id, {
    method: 'GET',
  });
}

// 分页查询会员任务列表
export async function queryMemberTaskList(params: MemberTaskListParams) {

  return request('/api/ums/task/queryMemberTaskList', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

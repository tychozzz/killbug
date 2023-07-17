import request from '../util/request';

interface BountyForm {
  title: string;
  content: string;
  reward: number;
  tags: Array<string>;
}

interface GrabBountyForm {
  id: string;
}

interface FinishBountyForm {
  id: string;
  solverId: string;
}

export const createBounty = (data: BountyForm) => {
  return request.post('/bounty/createBounty', data);
};

export const getBountyList = (
  pageNum: number,
  pageSize: number,
  status: number,
  token: string = ''
): any => {
  return request.get(`/bounty/getBountyList/${pageNum}/${pageSize}/${status}`, {
    headers: { Authorization: token },
  });
};

export const getBounty = (id: string) => {
  return request.get(`/bounty/getBounty/${id}`);
};

export const grabBounty = (data: GrabBountyForm) => {
  return request.post('/bounty/grabBounty', data);
};

export const closeBounty = (data: GrabBountyForm) => {
  return request.post('/bounty/closeBounty', data);
};

export const cancelBounty = (data: GrabBountyForm) => {
  return request.post('/bounty/cancelBounty', data);
};

export const finishBounty = (data: FinishBountyForm) => {
  return request.post('/bounty/finishBounty', data);
};

export const getMyBounties = () => {
  return request.get('/bounty/getMyBounties');
};

export const getBountiesByUserId = (id: string) => {
  return request.get(`/bounty/getBountiesByUserId/${id}`);
};

export const getMyGrabbedBounties = () => {
  return request.get('/bounty/getMyGrabbedBounties');
};

export const getGrabbedBountiesByUserId = (id: string) => {
  return request.get(`/bounty/getGrabbedBountiesByUserId/${id}`);
}

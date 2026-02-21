export function applyFilters(jobs, filters) {
  let result = [...jobs];

  if (filters.searchQuery) {
    result = result.filter(job =>
      job.title?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      job.company_name?.toLowerCase().includes(filters.searchQuery.toLowerCase())
    );
  }

  if (filters.locationFilter) {
    result = result.filter(job =>
      job.candidate_required_location
        ?.toLowerCase()
        .includes(filters.locationFilter)
    );
  }

  if (filters.jobType) {
    result = result.filter(job =>
      job.job_type?.toLowerCase().includes(filters.jobType.replace("_", " "))
    );
  }

  return result;
}

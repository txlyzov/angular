import { ActivatedRoute } from '@angular/router';

export function getQueryParamValue(
  activatedRoute: ActivatedRoute,
  param: string,
) {
  return activatedRoute.snapshot.queryParamMap.get(param);
}
